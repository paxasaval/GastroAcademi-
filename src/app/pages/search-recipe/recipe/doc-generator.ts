
import { TimesId } from 'src/app/models/times';

import { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun, AlignmentType, Footer, Header, Indent } from "docx";
import { readFile, readFileSync } from 'fs';
import { Buffer } from 'buffer';
import * as fs from "fs";
import { Recipe, RecipeId } from 'src/app/models/recipe';
import { IngredientsRecipeId } from 'src/app/models/ingredients-recipe';
import { InstructionsId } from 'src/app/models/instructions';
export class DocumentCreator {

  constructor() { }

  public create(Recipe: RecipeId, imageData: any, insgredints: IngredientsRecipeId[], instructions: InstructionsId[], times: TimesId[], logo1Data: any, logo2Data: any): Document {
    let reader = new FileReader();
    const image = new ImageRun({
      data: imageData,

      transformation: {
        width: 280,
        height: 250,
      },
    });
    const logo1 = new ImageRun({
      data: logo1Data,
      transformation: {
        width: 100,
        height: 50,
      },
    });
    const logo2 = new ImageRun({
      data: logo2Data,
      transformation: {
        width: 100,
        height: 50,
      }
    });
    reader.readAsArrayBuffer(new File([], 'data.txt'));
    const doc = new Document({
      creator: "GastroAcademi",
      description: "Esto es un receta generada en GastroAcademi.com",
      title: `${Recipe.name}`,
      sections: [
        {
          headers: {
            default: new Header({
              children: [
                new Paragraph(
                  {
                    children: [
                      new TextRun({
                        children:[logo1]
                      }),
                      new TextRun({
                        text:`\t\t\t\t\t\t\t\t`,

                      }),
                      new TextRun({
                        children:[logo2]
                      }),

                    ],
                    spacing:{
                      after:150
                    }
                  }
                )
              ]
            })
          },
          footers: {
            default: new Footer({
              children: [new Paragraph("GASTROACADEMI - @UTPL")]
            })
          },
          children: [
            new Paragraph(
              {
                children: [
                  new TextRun({
                    text: `${Recipe.name}`,
                    font: "Times New Roman",
                    size: "18pt"
                  })
                ],
              }
            ),
            new Paragraph(
              {
                children: [
                  image,
                  new TextRun({
                    text: "",
                    font: "Times New Roman",
                    size: "12pt",
                  }),
                ],
                spacing:{
                  before: 300,
                }
              }
            ),
            new Paragraph(
              {
                children: [
                  new TextRun({
                    children: [
                      new TextRun({
                        text: `Dificultad: `,
                        font: "Times New Roman",
                        size: "12pt",
                        bold: true,
                        break: 1
                      }),
                      new TextRun({
                        text: `${Recipe.difficulty}`,
                        font: "Times New Roman",
                        size: "12pt",
                        break: 0
                      }),
                    ]


                  }),


                ]
              }
            ),
            new Paragraph(
              {
                children: [
                  new TextRun({
                    text: `Porciones: `,
                    font: "Times New Roman",
                    size: "12pt",
                    bold: true,
                    break: 1

                  }),
                  new TextRun({
                    text: `${Recipe.portions}`,
                    font: "Times New Roman",
                    size: "12pt",
                    break: 0
                  }),

                ]
              }
            ),
            new Paragraph(
              {
                children: [
                  new TextRun({
                    text: `Tiempos: `,
                    font: "Times New Roman",
                    size: "12pt",
                    bold: true,
                    break: 1

                  }),
                ]
              }
            ),
            new Paragraph(
              {
                text: ` `,
                children: this.timesRecipe(times)
              }
            ),
            new Paragraph(
              {
                children: [
                  new TextRun({
                    text: `Ingredientes: `,
                    font: "Times New Roman",
                    size: "12pt",
                    bold: true,
                  }),
                ]
              }
            ),
            new Paragraph(
              {
                text: ` `,
                children: this.ingredientsRecipe(insgredints),
              }
            ),
            new Paragraph(
              {
                children: [
                  new TextRun({
                    text: `Instrucciones: `,
                    font: "Times New Roman",
                    size: "12pt",
                    bold: true,
                  }),
                ]
              }
            ),
            new Paragraph(
              {
                text: ` `,
                children: this.instructionsRecipe(instructions)
              }
            ),
          ]
        },
      ]
    });

    return doc
  }

  public timesRecipe(times: TimesId[]) {
    var aux: Paragraph[] = []
    times.forEach(t => {
      const child = new Paragraph({
        children: [
          new TextRun({
            text: `○\t${t.name}: ${t.total} ${t.measure}`,
            font: "Times New Roman",
            size: "12pt"
          }),
        ],
        indent:{
          left: 350
        },
        spacing:{
          before: 300,
        }
      })
      aux.push(child)
    })
    return aux
  }
  public ingredientsRecipe(ingredients: IngredientsRecipeId[]) {
    var aux: Paragraph[] = []
    var n = 1;
    ingredients.forEach(t => {
      const child = new Paragraph({
        children: [
          new TextRun({
            text: `${n}.\t${t.alias}: ${t.quantity} ${t.measure}`,
            font: "Times New Roman",
            size: "12pt"
          }),
        ],
        alignment: AlignmentType.JUSTIFIED,
        indent: {
          left: 350,
        },
        spacing:{
          before: 300,
          line:150
        }
      })
      aux.push(child)
      n = n + 1
    })
    return aux
  }
  public instructionsRecipe(instructions: InstructionsId[]) {
    var aux: Paragraph[] = []
    var x: number = 0
    instructions.sort((a, b) => (a.position! > b.position!) ? 1 : -1)
    instructions.forEach(i => {
      const child = new Paragraph({
        children: [
          new TextRun({
            text: `${i.position}.\t${i.description}`,
            font: "Times New Roman",
            size: "12pt",
          }),

        ],
        indent: {
          left: 350,
        },
        spacing:{
          before: 300,
        },
        alignment: AlignmentType.JUSTIFIED,

      })
      aux.push(child)
    })
    return aux
  }
}
