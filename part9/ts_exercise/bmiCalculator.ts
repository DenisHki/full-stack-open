const calculateBmi = (height:number, weight:number) => {
    let bmi = weight / ((height/100) ** 2)
    if (bmi < 18.5) {
        console.log("Underweight")
    }
    else if (18.5 <= bmi && bmi <= 24.9) {
        console.log("Normal range")
    }
    else {
        console.log("Overweight")
    }
    
}
calculateBmi(180, 74)