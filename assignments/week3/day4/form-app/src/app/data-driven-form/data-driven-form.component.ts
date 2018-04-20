import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

interface User {
    name: string;
    email: string;
    post: string;
}

@Component({
  selector: 'data-driven-form',
  templateUrl: './data-driven-form.component.html',
  styleUrls: ['./data-driven-form.component.css']
})
export class DataDrivenFormComponent implements OnInit {
    form: FormGroup;
    name: FormControl;
    email: FormControl;
    post: FormControl;
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    createForm() {
        this.form = new FormGroup({
            name: this.name,
            email: this.email,
            post: this.post
        });
    }

    createFormControls() {
        this.name = new FormControl('', Validators.required);
        this.email = new FormControl('', [
            Validators.required,
            Validators.email
        ]);
        this.post = new FormControl('', [
            Validators.required,
            Validators.minLength(10)
        ]);
    }

    submit() {
        if(this.form.valid) {
            const user: User = {
                name: this.name.value,
                email: this.email.value,
                post: this.post.value
            };
            console.log(user);
            this.form.reset();
        }
    }

    getData() {
        forkJoin([this.dataService.getUserById(1), this.dataService.getPostById(1)]).subscribe(data => {
            this.name.setValue(data[0]['name']);
            this.email.setValue(data[0]['email']);
            let postItem: string = "";
            data[1].forEach(post => {
                postItem += `${post.body}\n`
            });
            this.post.setValue(postItem);
        });
    }
}
