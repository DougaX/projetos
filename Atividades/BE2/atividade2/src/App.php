<?php

namespace App;

class App
{
    public static function init(): void
    {
        echo "=== ATIVIDADE 2 - TRAIT IMC + INTERFACE iFUNCIONARIO ===" . PHP_EOL . PHP_EOL;

        // Criando atletas (usam Trait IMC e implementam iFuncionario)
        $atleta1 = new Atleta(
            "Neymar Jr", 
            32, 
            68, 
            1.75, 
            "Futebol", 
            2500000.00, 
            3
        );

        $atleta2 = new Atleta(
            "Gabriel Medina", 
            30, 
            73, 
            1.82, 
            "Surf", 
            800000.00, 
            2
        );

        $atleta3 = new Atleta(
            "Rebeca Andrade", 
            25, 
            51, 
            1.55, 
            "Ginástica", 
            150000.00, 
            4
        );

        // Criando médicos (implementam iFuncionario, mas não usam Trait IMC)
        $medico1 = new Medico(
            "Dr. Carlos Silva", 
            45, 
            82, 
            1.78, 
            "Ortopedia", 
            "CRM-12345", 
            35000.00, 
            5
        );

        $medico2 = new Medico(
            "Dra. Ana Paula", 
            38, 
            65, 
            1.68, 
            "Cardiologia", 
            "CRM-67890", 
            42000.00, 
            1
        );

        // Testando métodos da Trait IMC nos atletas
        echo "=== TESTE TRAIT IMC ===" . PHP_EOL;
        echo "Atleta: " . $atleta1->getNome() . PHP_EOL;
        echo "IMC: " . $atleta1->getIMC() . PHP_EOL;
        echo "Classificação: " . $atleta1->classifica() . PHP_EOL;
        echo "É normal para a idade? " . ($atleta1->isNormal() ? "Sim" : "Não") . PHP_EOL;
        echo PHP_EOL;

        // Criando relatório
        $relatorio = new Relatorio();
        
        // Adicionando pessoas (todos são do tipo Pessoa)
        $relatorio->add($atleta1);
        $relatorio->add($atleta2);
        $relatorio->add($atleta3);
        $relatorio->add($medico1);
        $relatorio->add($medico2);

        // Gerando log (mostra info de contrato apenas para quem implementa iFuncionario)
        $relatorio->log();
    }
}