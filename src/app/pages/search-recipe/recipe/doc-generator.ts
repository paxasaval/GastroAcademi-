import { TimesId } from 'src/app/models/times';
import { HttpClient } from '@angular/common/http';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun, AlignmentType } from "docx";
import { readFile, readFileSync } from 'fs';
import { Buffer } from 'buffer';
import * as fs from "fs";
import { Recipe, RecipeId } from 'src/app/models/recipe';
import { IngredientsRecipeId } from 'src/app/models/ingredients-recipe';
import { InstructionsId } from 'src/app/models/instructions';
export class DocumentCreator {

  constructor() { }

  public create(Recipe: RecipeId, imageData: any, insgredints: IngredientsRecipeId[], instructions: InstructionsId[], times: TimesId[]): Document {
    let reader = new FileReader();
    const image = new ImageRun({
      data: imageData,
      transformation: {
        width: 275,
        height: 250,
      },
    });
    reader.readAsArrayBuffer(new File([], 'data.txt'));
    const doc = new Document({
      creator: "GastroAcademi",
      description: "Esto es un receta generada en GastroAcademi.com",
      title: `${Recipe.name}`,
      sections: [
        {
          children: [
            new Paragraph(
              {
                text: `${Recipe.name}`,
                heading: HeadingLevel.TITLE,
              }
            ),
            new Paragraph(
              {
                children: [image],
              }
            ),
            new Paragraph(
              {
                text:'Tiempos',
                heading: HeadingLevel.HEADING_2,
              }
            ),
            new Paragraph(
              {
                text:' ',
                children:this.timesRecipe(times)
              }
            ),
            new Paragraph(
              {
                text:'Ingredientes',
                heading: HeadingLevel.HEADING_2,
              }
            ),
            new Paragraph(
              {
                text:' ',
                children:this.ingredientsRecipe(insgredints)
              }
            ),
            new Paragraph(
              {
                text:'Instrucciones',
                heading: HeadingLevel.HEADING_2,
              }
            ),
            new Paragraph(
              {
                text:' ',
                children:this.instructionsRecipe(instructions)
              }
            ),
          ]
        },
      ]
    });

    return doc
  }

  public timesRecipe(times: TimesId[]){
    var aux:Paragraph[] = []
    times.forEach(t=>{
      const child = new Paragraph({
        children:[
          new TextRun(`○ ${t.name}: ${t.total} ${t.measure}`),
        ]
      })
      aux.push(child)
    })
    return aux
  }
  public ingredientsRecipe(ingredients: IngredientsRecipeId[]){
    var aux:Paragraph[] = []
    ingredients.forEach(t=>{
      const child = new Paragraph({
        children:[
          new TextRun(`☼ ${t.alias}: ${t.quantity} ${t.measure}`),
        ]
      })
      aux.push(child)
    })
    return aux
  }
  public instructionsRecipe(instructions: InstructionsId[]){
    var aux:Paragraph[] = []
    var x:number=0
    instructions.sort((a,b)=>(a.position!>b.position!)?1:-1)
    instructions.forEach(i=>{
      const child = new Paragraph({
        children:[
          new TextRun(`${i.position}) ${i.description}`),
        ]
      })
      aux.push(child)
    })
    return aux
  }
}
