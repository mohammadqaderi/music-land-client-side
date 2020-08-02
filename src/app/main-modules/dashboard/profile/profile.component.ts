import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../models/user/profile';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {HelperService} from '../../../Shared/services/helper.service';
import {ProfileService} from '../../../services/user/profile.service';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  formData: FormData = new FormData();
  updateProfileDto: FormGroup;
  public uploader: FileUploader = new FileUploader({});
  selectedImage: string = null;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private fb: FormBuilder,
              private helperService: HelperService) {
  }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe((prof: Profile) => {
      this.authService.profile.next(prof);
      this.prepareUpdateForm(prof);
      this.prepareProfile();
    });
  }

  prepareProfile() {
    this.authService.profile.subscribe((prof: Profile) => {
      this.profile = prof;
    });
  }

  prepareUpdateForm(profile: Profile) {
    this.updateProfileDto = this.fb.group({
      firstName: new FormControl(profile.firstName),
      lastName: new FormControl(profile.lastName),
      age: new FormControl(profile.age),
      gender: new FormControl(profile.gender),
      city: new FormControl(profile.city),
      address: new FormControl(profile.address),
      phone: new FormControl(profile.phone),
      country: new FormControl(profile.country)
    });
  }

  // observer of image changing
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedImage = file.name;
      this.formData.set('image', file);
    }
  }

  uploadProfileImage() {
    this.helperService.showSpinner();
    this.profileService.uploadProfileImage(this.formData)
      .subscribe((updateProfile: Profile) => {
        this.authService.profile.next(updateProfile);
        this.formData.delete('image');
        this.selectedImage = null;
        this.helperService.hideSpinner();
        this.helperService
          .openSnackbar('Profile image uploaded successfully', 'okay');
      });
  }

  changeProfileImage() {
    this.helperService.showSpinner();
    this.profileService.changeProfileImage(this.formData)
      .subscribe((updateProfile: Profile) => {
        this.authService.profile.next(updateProfile);
        this.formData.delete('image');
        this.selectedImage = null;
        this.helperService.hideSpinner();
        this.helperService
          .openSnackbar('Profile image changed successfully', 'okay');
      });
  }

  updateUserProfile() {
    this.helperService.showSpinner();
    this.profileService.editUserProfile(this.updateProfileDto.value)
      .subscribe((updateProfile: Profile) => {
        console.log(updateProfile);
        this.authService.username =
          `${updateProfile.firstName} ${updateProfile.lastName}`;
        this.authService.profile.next(updateProfile);
        this.helperService.hideSpinner();
        this.helperService
          .openSnackbar('User profile updated successfully', 'okay');
      });
  }

  deleteProfileImage() {
    this.helperService.showSpinner();
    this.profileService.deleteProfileImage()
      .subscribe((updateProfile: Profile) => {
        this.authService.profile.next(updateProfile);
        this.helperService.hideSpinner();
        this.helperService
          .openSnackbar('Profile image deleted successfully', 'okay');
      });
  }


}
