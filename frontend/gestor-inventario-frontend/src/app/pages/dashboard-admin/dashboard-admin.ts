import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
  producto: ['', [Validators.required]],
  cantidad: ['', [Validators.required]],
  proveedor: ['', [Validators.required]],
  unidad: ['', [Validators.required]]
});
  }

  onSubmit() {
  console.log(this.form.value);
}
}