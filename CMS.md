**Static CMS** är en react-app som är inlagd på /admin. Den fungerar helt client-side. Man autentiserar sig via github, och därefter använder CMSen githubs api för att ladda upp/redigera markdown filer. Markdown filerna används av Astro för att bygga sidan. 

Här är en flowchart som illustrerar:

![Diagram](https://mermaid.ink/img/pako:eNqNk09vozAQxb_KyL0mqrQ5LYeVEiC0lbqH0hvkYOwBrICN7KFZVPrd1_zJKodKGx8sy_69ec_W-JMJI5EFrLK8q-E9yjX4sc8i_MDGdGhPsN3-Gg-9aqQDriVI7BozuBEO2QtvHXFxhlQRnhbpYeaftWh6iZ4Ks5Q4KQHhawqc4JHLVukVjrLQaEJNEEtFZjXbC4HOzeIFC5ftnmqPKsEJHVwU1SPEWaLoqS_WevEMJpZr8mHnMkBmhGM2JYQ37IybfIbTbeHJ28Ert2dpLhpK1UzexwU5zkho2naCRM11NZ3Gt4bvVlUVWh8Ki9qY8whJ9hupUeXw-GQcKV1BivZDiesrJbPuDYvv3nVBltnR0CDsp1BN8FD-LDeOrDlj8LDb7db19qIk1cGP7s-tJlo1RXG_5rBqZCnv1oTXbPJ-TXz1kfdnO_7Ldr8muWb7z33YhrVoW66k_wqfU4Wc-WZrMWeBX0rfGjnL9ZfneE8mHbRgAdkeN6zvpO_HSHH_g1oWlLxx-PUX1uccDA?type=png)

## Autentisering

Som sagt så autentiserar man sig via github för att redigera. Kontot måste ha behörigheter på detta repo. Det innebär att en styrelse-medlem måste ha ett github konto. Ett förslag är att de får skapa ett github konto med en @kogvet mail, som de får ansvara för att passera till nya styrelser.

## Page preview

Förhandsvisning funkar just nu inte.  För *nyheter* och *medlemmar* används ett bibliotek för att konvertera svelte-komponenter till react-komponenter. Biblioteket är ganska gammalt och verkar inte funka längre. För sidor (*utskott*), försökte jag göra en lösning med iframes. En react-komponent laddar in sidan via en iframe- och letar rätt på html-elementen som motsvarar de redigerbara fälten, och uppdaterar innerHTML efter vad som skrivs. Det verkar ha slutat funka. I vilket fall var det ingen robust lösning, eftersom komponenten aldrig renderades om. Det enda som funkade var därför att redigera text.

## Markdown
Markdown filerna med innehåll finns alltså i detta repo. Dem finns under [src/data/](src/data). Static-cms redigerar/skapar dessa filer genom githubs api. I källkoden importeras markdown filerna och görs om till html. Läs i koden och [Astro-dokumentation](https://docs.astro.build/en/guides/markdown-content/) för att förstå hur det funkar
