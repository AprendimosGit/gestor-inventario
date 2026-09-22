import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reposicion-stock',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reposicion-stock.html',
  styleUrl: './reposicion-stock.css',
})
export class ReposicionStock {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            ingrediente: [''],
            cantidad: [''],
            proveedor: ['']
        })
    }
}