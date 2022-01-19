import { TechniquesService } from './../../../../service/recipe/techniques.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Techniques } from 'src/app/models/techniques';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-technique',
  templateUrl: './new-technique.component.html',
  styleUrls: ['./new-technique.component.sass']
})
export class NewTechniqueComponent implements OnInit {

  file?: File

  newTechniqueForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    resource: new FormControl('', [Validators.required])
  })

  constructor(
    private techniquesService: TechniquesService,
    private dialogRef: MatDialogRef<NewTechniqueComponent>,
    private toast: HotToastService,

  ) { }

  onFileSelected(event: any) {
    this.file = event.target.files[0];

  }

  submit() {
    const load = this.toast.loading("Cargando...")
    if (!this.newTechniqueForm.valid) {
      return
    }
    const { name, type } = this.newTechniqueForm.value
    var newTechnique: Techniques = {}
    newTechnique.name = name
    newTechnique.type = type
    if (newTechnique.type === 'Enlace') {
      const { resource } = this.newTechniqueForm.value
      newTechnique.resource = resource
      this.techniquesService.postTechniques(newTechnique).then(
        result => {
          load.close()
          Swal.fire({
            icon: 'success',
            title: 'Tecnica subida con exito',
          })
        }
      )

    } else {
      this.techniquesService.uploadTechnique(this.file!).then(
        file => {
          file.ref.getDownloadURL().then(
            path => {
              newTechnique.resource = path
              this.techniquesService.postTechniques(newTechnique).then(
                result => {
                  load.close()
                  Swal.fire({
                    icon: 'success',
                    title: 'Tecnica subida con exito',
                  })
                })
            })
        })
    }
    this.dialogRef.close()
  }

  ngOnInit(): void {
  }

  get type() {
    return this.newTechniqueForm.get('type')
  }


  get name() {
    return this.newTechniqueForm.get('name')
  }


  get resource() {
    return this.newTechniqueForm.get('resource')
  }

}
