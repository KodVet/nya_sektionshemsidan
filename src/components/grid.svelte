<script>
    //Takes a string either: "left" or "right" and changes which box is a picture and which box is text//
    export let direction;

    //Takes a string and displays it//
    export let text;

    //Takes a string to use as img source//
    export let link;

    let dir = "direction_right"
    if (direction == "right"){
        dir = "direction_right"
    }
    else {
        dir = "direction_left"
    }
</script>

<div id = {dir} class = container>

    <div class= "box1">
        <p class = "txt" >{text}</p>
    
    </div>

    <div class = "box2">
        <img src={link}>

    </div>
    
  

</div>

<style>

.container {
    margin: 5%;
    height: 400px;
    width: 1000px;
    display: flex;
    justify-content: space-around;
}


#direction_right {
    flex-direction: row;
    
}

#direction_left {
    flex-direction: row-reverse;
}

.box1{
    height: 300px;
    width: 40%;
    margin: 5%;
    background-color: grey;

}

.box2{
    height: 300px;
    width: 40%;
    background-color: grey;
    display: flex;
    margin: 5%;
    justify-content: center;
}

.txt{
    margin: 5% ;
}

</style>