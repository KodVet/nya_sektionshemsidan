<script>
    let namn ='';
    let lagom_namn ='';
    export let efternamn;

    function shorter() {
        if (namn.length > 6){
            lagom_namn = namn.slice(0, 6);
            console.log(lagom_namn);
        }
        return lagom_namn
    return namn
    }
</script>
<input bind:value = {namn}/> 
<p>
    Tjenixen {shorter(namn)}, nice lagom namn du har!
    Ditt efternamn e {efternamn}. elle hur?
</p>