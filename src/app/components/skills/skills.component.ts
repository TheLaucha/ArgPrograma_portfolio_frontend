import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  public skillsFront: Skill[] = [];
  public skillsBack: Skill[] = [];
  public skillsOther: Skill[] = [];
  public editSkill: Skill | undefined;
  public deleteSkill: Skill | undefined;
  public admin : boolean = false;

  constructor(private skillService: SkillService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.getSkills();
    this.getAuthorities();
  }

  public getAuthorities():void{
    const auth = this.tokenService.getAuthorities()
    auth?.includes('ROLE_ADMIN') ? this.admin = true : false
  }

  public getSkills(): void {
    this.skillService.getSkills().subscribe({
      next: (data: Skill[]) => {
        this.skillsFront = data.filter(el => el.type === 'front')
        this.skillsBack = data.filter(el => el.type === 'back')
        this.skillsOther = data.filter(el => el.type === 'other')
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
    });
  }

  public onAddSkill(addForm: NgForm): void {
    // Cierra el modal
    document.getElementById('add-skill-close-btn')?.click();
    // Si type esta vacio lo agrega a other
    if(!addForm.value.type){
      addForm.value.type = 'other'
    }
    // Guarda
    this.skillService.addSkill(addForm.value).subscribe({
      next: (res: Skill) => {
        console.log(res);
        this.getSkills();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateSkill(skill: Skill): void {
    // Cierra
    document.getElementById('edit-skill-close-btn')?.click();
    // Edita
    this.skillService.updateSkill(skill).subscribe({
      next: (res: Skill) => {
        console.log(res);
        this.getSkills();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
    });
  }

  public onDeleteSkill(skillId: number | undefined): void {
    // Cierra
    document.getElementById('delete-skill-close-btn')?.click();
    // Delete
    this.skillService.deleteSkill(skillId).subscribe({
      next: (res: void) => {
        console.log(res);
        this.getSkills();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
    });
  }

  public onOpenModal(mode: string, skill?: Skill): void {
    if (mode == 'edit') {
      this.editSkill = skill;
    }
    if (mode === 'delete') {
      this.deleteSkill = skill;
    }
  }

}
