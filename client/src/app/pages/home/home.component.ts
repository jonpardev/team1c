import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service'; // Express API

@Component({
  selector: 'app-survey',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  surveys: any = [];

  constructor(
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    // super(route);
    this.getSurveyList();
  }

  ngOnInit(): void {
    // this.title = 'ABCD?';
  }

  getSurveyList(): void {
    this.apiService.getSurveyList().subscribe(data => {
      this.surveys = data;
    });
  }

  removeSurvey(survey: any, index: number): void {
    if (window.confirm('Are you sure?')) {
      this.apiService.removeSurvey(survey._id).subscribe(data => {
        this.surveys.splice(index, 1);
      });
    }
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}