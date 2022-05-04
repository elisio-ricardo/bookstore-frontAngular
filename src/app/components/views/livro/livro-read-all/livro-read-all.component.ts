import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-read-all",
  templateUrl: "./livro-read-all.component.html",
  styleUrls: ["./livro-read-all.component.css"],
})
export class LivroReadAllComponent implements OnInit {
  displayedColumns: string[] = ["id", "titulo", "livros", "acoes"];

  id_cat: String = "";

  livros: Livro[] = [];

  constructor(private service: LivroService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //ngInit serve para chamar os metodos assim que carregar a pagina
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!; //vai pegar o id da URL
    this.findAll();
  }

  findAll(): void {
    this.service.findAllCategoria(this.id_cat).subscribe((resposta) => {
      this.livros = resposta;
      console.log(this.livros);
    });
  }
}
