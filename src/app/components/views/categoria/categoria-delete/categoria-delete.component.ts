import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "../categoria.model";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-categoria-delete",
  templateUrl: "./categoria-delete.component.html",
  styleUrls: ["./categoria-delete.component.css"],
})
export class CategoriaDeleteComponent implements OnInit {
  categoria: Categoria = {
    id: "",
    nome: "",
    descricao: "",
  };

  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //route != router
  }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get("id")!; //pega o id da url
    this.findById(); //sempre que carregar a tela ativa este metodo
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria.nome = resposta.nome;
      this.categoria.descricao = resposta.descricao;
    });
  }

  delete(): void {
    this.service.delete(this.categoria.id!).subscribe(
      (resposta) => {
        this.router.navigate(["categorias"]); //faz voltar para a tela de categoria
        this.service.mensagem("Categoria deletada com sucesso!");
      },
      (err) => {
        this.service.mensagem(err.error.error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["categorias"]);
  }
}
