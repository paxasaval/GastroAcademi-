import { Recipe } from './../../models/recipe';
import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";
export class DocumentCreator {

  public create(Recipe: Recipe): Document {
    const doc = new Document({
      creator: "GastroAcademi",
      description: "Esto es un receta generada en GastroAcademi.com",
      title: `${Recipe.name}`,
      sections:[{
        children:[

        ]
      }]
  });

    return doc
  }
}
