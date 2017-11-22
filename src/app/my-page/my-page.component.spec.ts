// Angular testing modules & classes
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Essential angular needed
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { NgModule, DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AgWordCloudData, AgWordCloudModule } from 'angular4-word-cloud';

// Other componets/services, neded for test to work for the targetted specific test subject
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

// Targetted test subject - a service or a component
import { MyPageComponent } from './my-page.component';

describe('MyPageComponent', () => {
  let component: MyPageComponent;
  let fixture: ComponentFixture<MyPageComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPageComponent ],
      providers: [
        AuthService,
        DataService
      ],
      imports : [
        FormsModule,
        HttpModule,
        RouterTestingModule,
        AgWordCloudModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPageComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
