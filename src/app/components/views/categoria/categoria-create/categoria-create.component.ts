import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Categoria } from "../categoria.model";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-categoria-create",
  templateUrl: "./categoria-create.component.html",
  styleUrls: ["./categoria-create.component.css"],
})
export class CategoriaCreateComponent implements OnInit {
  categoria: Categoria = {
    nome: "",
    descricao: "",
  };

  constructor(private service: CategoriaService, private router: Router) {
    //o router serve para assim que criar ele redirecionar para a pagina de listagem de categoria
  }

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.categoria).subscribe(
      (resposta) => {
        this.router.navigate(["categorias"]);
        this.service.mensagem("Categoria criada com sucesso!"); //vai disparar o snack de confirmação que esta na categoria.service
      },
      (err) => {
        //para pegar a mensagm de erro que aparece no console, é um vetor de mensagens
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.mensagem(err.error.errors[i].message);
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(["categorias"]);
  }
}
