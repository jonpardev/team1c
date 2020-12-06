import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service'; // Express API
import Swal from 'sweetalert2';
import { User } from '../../model/user.model';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-survey',
  templateUrl: './mysurvey.component.html',
  styleUrls: ['./mysurvey.component.css']
})

export class MysurveyComponent implements OnInit {

  filterSurveys: any = [];
  surveys: any = [];
  user: User ;
  constructor(
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    // super(route);
    this.getSurveyList();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getSurveyList(): void {
    
    this.apiService.getSurveyList().subscribe(data => {
    

      for( var i =0; i <data.length; i++){
       
        if(this.user.id == data[i].userId){
          this.filterSurveys.push(data[i]);
        }
      }
      this.surveys = this.filterSurveys;
    });
  }

  removeSurvey(survey: any, index: number): void {
    if (window.confirm('Are you sure?')) {
      this.apiService.removeSurvey(survey._id).subscribe(data => {
        this.surveys.splice(index, 1);
        // Success message to User
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The survey is deleted !',
          showConfirmButton: false,
          timer: 1500
        })
        
      });
    }
  }


  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
