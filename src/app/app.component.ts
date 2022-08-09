import { Component, OnInit } from '@angular/core';
import { ProjectService } from './service/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'portfolio_app';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {}
}
