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
        <p>{text}</p>
    
    </div>

    <div class = "box2">
        <img src={link}>

    </div>
    
  

</div>

<style>

.container {
    margin: 5%;
    background-color: aqua;
    height: 400px;
    width: 1000px;
    display: flex;
    justify-content: space-around;
}


#direction_right {
    flex-direction: column;
    
}

#direction_left {
    flex-direction: row-reverse;
}

.box1{
    height: 300px;
    width: 30%;
    background-color: green;

}

.box2{
    height: 300px;
    width: 30%;
    background-color: red;
    display: flex;
    justify-content: center;
}

</style>