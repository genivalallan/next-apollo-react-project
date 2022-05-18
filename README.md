## `Teste Full Stack`

O objetivo desse teste é avaliar a sua capacidade de construir um app Full Stack, usando as mesmas tecnologias que utilizamos no Fundamentei. Se você já é usuário do site, então provavelmente já conhece e usa o que o teste lhe propõe a desenvolver: a **Minha Carteira**—mas calma, não exatamente com todas as funcionalidades que temos lá 😌.

## O que preciso fazer? 👨🏻‍🏫

O objetivo é você reproduzir exatamente o seguinte app:

![Minha Carteira](./Minha%20Carteira@1.png)

### Os requisitos funcionais:

- Quando o usuário pressionar **[Enter]** com um ativo a ser pesquisado, o mesmo deverá ser adicionado a sua carteira;
- A quantidade inicial de ações será 1 para todos os ativos;
- Apenas ativos do **Brasil** e **Estados Unidos** poderão ser adicionados;
- Ao clicar "REMOVER", o determinado ativo deverá ser removido da carteira _imediatamente_;
- O número de ações é um **_input_**, sempre inteiro, e deve estar entre 0 e 100. O valor poderá ser alterado a qualquer momento. Persistir as modificações após um **[Tab]**;
- Observe as cores, elas variam de acordo com o país.

#### E de onde vou tirar os dados?

Utilize a seguinte API para pesquisa dos ativos: https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=WEGE3&apikey=ZPGGQ60N01NSX2MO. Se a chave expirar, você mesmo pode solicitar uma utilizando o seu email. É uma API "pública".

```JSON
{
  "bestMatches": [
    {
      "1. symbol": "WEGE3.SAO",
      "2. name": "WEG S.A",
      "3. type": "Equity",
      "4. region": "Brazil/Sao Paolo",
      "5. marketOpen": "10:00",
      "6. marketClose": "17:30",
      "7. timezone": "UTC-03",
      "8. currency": "BRL",
      "9. matchScore": "0.7692"
    }
  ]
}
```

Você irá precisar também de uma instância do MongoDB para fazer o teste. Para isso, você pode utilizar o Docker para
simplificar o processo:

```SH
$ docker run -it --rm -p 27017:27017 mongo:5.0.8
```

## E como faço para entregar meu código? 🤔

Abra uma _Pull Request_ nesse mesmo repositório. Seu código será avaliado individualmente com as devidas considerações.

## Considerações finais 🚀

- Todos os detalhes serão analisados, faça o seu melhor!
- Você não deve levar mais do que 6 à 8 horas para concluir o projeto;
- Busque a simplicidade com os devidos detalhes. Um extra é sempre bem-vindo;
- Você precisará explicar o que fez, então, _be yourself_.
