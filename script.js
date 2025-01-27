const units = {
    currency: {
        usd: 1,
        eur: 0.85,
        jpy: 110,
        vnd: 23000,
        gbp: 0.75,
        aud: 1.35,
        cad: 1.25,
        inr: 74,
        cny: 6.45,
        krw: 1100,
        chf: 0.92,
        hkd: 7.8,
        brl: 5.45,
        mxn: 20.15,
        zar: 16.05,
        sek: 8.5,
        nzd: 1.4,
        pln: 4.5,
        czk: 22.5,
        try: 18
    },
    volume: {
        si: {
            liters: 1,
            milliliters: 1000,
            cubicMeters: 0.001,
            cubicCentimeters: 1000,
            litersPerSecond: 1,
            millilitersPerSecond: 1000,
        },
        imperial: {
            gallons: 0.264172,
            pints: 2.11338,
            cups: 4.22675,
            fluidOunces: 33.814,
        },
        us: {
            gallons: 0.264172,
            quarts: 1.05669,
            cups: 4.22675,
            fluidOunces: 33.814,
        }
    },
    length: {
        si: {
            meters: 1,
            kilometers: 0.001,
            centimeters: 100,
            millimeters: 1000,
            micrometers: 1e6,
            nanometers: 1e9
        },
        imperial: {
            miles: 0.000621371,
            yards: 1.09361,
            feet: 3.28084,
            inches: 39.3701
        },
        us: {
            yards: 1.094,
            feet: 3.281,
            miles: 0.000621371
        }
    },
    mass: {
        si: {
            grams: 1,
            kilograms: 0.001,
            milligrams: 1000,
            micrograms: 1e6
        },
        imperial: {
            pounds: 0.00220462,
            ounces: 0.035274,
            stones: 0.000157473
        },
        us: {
            pounds: 0.00220462,
            ounces: 0.035274
        }
    },
    temperature: {
        celsiusToFahrenheit: (value) => (value * 9/5) + 32,
        fahrenheitToCelsius: (value) => (value - 32) * 5/9,
        celsiusToKelvin: (value) => value + 273.15,
        kelvinToCelsius: (value) => value - 273.15,
        fahrenheitToKelvin: (value) => ((value - 32) * 5/9) + 273.15,
        kelvinToFahrenheit: (value) => ((value - 273.15) * 9/5) + 32
    },
    energy: {
        si: {
            joules: 1,
            kilojoules: 0.001,
            calories: 0.239006,
            kilocalories: 0.000239006,
            wattHours: 0.000277778,
            kilowattHours: 0.000000277778
        },
        imperial: {
            BTU: 0.000947817,
            footPounds: 0.737562,
        },
        us: {
            BTU: 0.000947817,
            footPounds: 0.737562,
        }
    },
    area: {
        si: {
            squareMeters: 1,
            squareKilometers: 0.000001,
            hectares: 0.0001,
            squareCentimeters: 10000,
            squareMillimeters: 1000000
        },
        imperial: {
            squareMiles: 3.861e-7,
            squareYards: 1.19599,
            squareFeet: 10.7639,
            squareInches: 1550.0031,
        },
        us: {
            squareMiles: 3.861e-7,
            squareFeet: 10.7639,
            squareInches: 1550.0031,
        }
    },
    speed: {
        si: {
            metersPerSecond: 1,
            kilometersPerHour: 3.6,
            centimetersPerSecond: 100,
        },
        imperial: {
            milesPerHour: 2.23694,
            feetPerSecond: 3.28084,
            inchesPerSecond: 39.3701,
        },
        us: {
            milesPerHour: 2.23694,
            feetPerSecond: 3.28084,
        }
    },
    time: {
        si: {
            seconds: 1,
            minutes: 1 / 60,
            hours: 1 / 3600,
            days: 1 / 86400,
        },
        imperial: {
            seconds: 1,
            minutes: 1 / 60,
            hours: 1 / 3600,
            weeks: 1 / 604800,
        },
        us: {
            seconds: 1,
            minutes: 1 / 60,
            hours: 1 / 3600,
        }
    },
    power: {
        si: {
            watts: 1,
            kilowatts: 0.001,
            joulesPerSecond: 1
        },
        imperial: {
            horsepower: 0.00134102,
            footPoundsPerSecond: 0.737562,
        },
        us: {
            horsepower: 0.00134102,
        }
    },
    data: {
        bytes: 1,
        kilobytes: 0.000976563,
        megabytes: 9.5367431640625e-7,
        gigabytes: 9.313225746154785e-10,
        terabytes: 9.094947017729282e-13,
        petabytes: 8.881784197001252e-16
    },
    pressure: {
        si: {
            pascal: 1,
            kilopascal: 0.001,
            bar: 0.00001,
            atmosphere: 9.86923e-6,
            psi: 0.000145038
        },
        imperial: {
            psi: 0.000145038,
            inchesOfMercury: 0.0002953,
        },
        us: {
            psi: 0.000145038,
            bar: 0.00001,
        }
    },
    angle: {
        si: {
            degrees: 1,
            radians: Math.PI / 180,
            gradians: 1.11111111,
        },
        imperial: {
            degrees: 1,
            minutes: 60,
            seconds: 3600
        },
        us: {
            degrees: 1,
            minutes: 60,
            seconds: 3600
        }
    }
};

const unitTypeSelector = document.getElementById("unit-type");
const fromUnitSelector = document.getElementById("from-unit");
const toUnitSelector = document.getElementById("to-unit");
const inputField = document.getElementById("input-value");
const outputField = document.getElementById("output-value");
const sameSystemBtn = document.getElementById("same-system-btn");
const differentSystemBtn = document.getElementById("different-system-btn");
const convertButton = document.getElementById("convert-btn");

let currentSystem = "different";

function populateUnitSelectors() {
    const unitType = unitTypeSelector.value;
    const unitCategory = units[unitType];

    fromUnitSelector.innerHTML = '';
    toUnitSelector.innerHTML = '';

    if (unitType === 'temperature') {
        const tempUnits = ['Celsius', 'Fahrenheit', 'Kelvin'];

        tempUnits.forEach(unit => {
            const optionFrom = document.createElement("option");
            optionFrom.value = unit;
            optionFrom.textContent = unit;
            fromUnitSelector.appendChild(optionFrom);

            const optionTo = document.createElement("option");
            optionTo.value = unit;
            optionTo.textContent = unit;
            toUnitSelector.appendChild(optionTo);
        });

        return;
    }

    if (unitType === 'currency' || unitType === 'data') {
        for (let unit in unitCategory) {
            const optionFrom = document.createElement("option");
            optionFrom.value = unit;
            optionFrom.textContent = unit;
            fromUnitSelector.appendChild(optionFrom);

            const optionTo = document.createElement("option");
            optionTo.value = unit;
            optionTo.textContent = unit;
            toUnitSelector.appendChild(optionTo);
        }
        return;
    }

    for (let system in unitCategory) {
        if (currentSystem === 'same' && system !== 'si') continue; // Filter based on system
        for (let unit in unitCategory[system]) {
            const optionFrom = document.createElement("option");
            optionFrom.value = unit;
            optionFrom.textContent = unit;
            fromUnitSelector.appendChild(optionFrom);

            const optionTo = document.createElement("option");
            optionTo.value = unit;
            optionTo.textContent = unit;
            toUnitSelector.appendChild(optionTo);
        }
    }
}

convertButton.addEventListener("click", () => {
    const unitType = unitTypeSelector.value;
    const fromUnit = fromUnitSelector.value;
    const toUnit = toUnitSelector.value;
    const inputValue = parseFloat(inputField.value);

    if (isNaN(inputValue)) {
        outputField.value = "Please enter a valid number";
        return;
    }

    if (!units[unitType]) {
        outputField.value = "Invalid unit type";
        return;
    }

    let convertedValue;

    if (unitType === 'temperature') {
        if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
            convertedValue = (inputValue * 9 / 5) + 32;
        } else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
            convertedValue = (inputValue - 32) * 5 / 9;
        } else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
            convertedValue = inputValue + 273.15;
        } else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
            convertedValue = inputValue - 273.15;
        } else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
            convertedValue = ((inputValue - 32) * 5 / 9) + 273.15;
        } else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
            convertedValue = ((inputValue - 273.15) * 9 / 5) + 32;
        } else {
            convertedValue = inputValue;
        }
    } else if (unitType === 'currency' || unitType === 'data') {
        const fromFactor = units[unitType][fromUnit];
        const toFactor = units[unitType][toUnit];
        if (!fromFactor || !toFactor) {
            outputField.value = "Invalid conversion";
            return;
        }
        convertedValue = inputValue * (fromFactor / toFactor);
    } else {
        let fromFactor, toFactor;
        for (let system in units[unitType]) {
            if (units[unitType][system][fromUnit]) fromFactor = units[unitType][system][fromUnit];
            if (units[unitType][system][toUnit]) toFactor = units[unitType][system][toUnit];
        }
        if (!fromFactor || !toFactor) {
            outputField.value = "Invalid conversion";
            return;
        }
        convertedValue = inputValue * (fromFactor / toFactor);
    }

    outputField.value = convertedValue.toFixed(4);
});

sameSystemBtn.addEventListener("click", () => {
    currentSystem = "same";
    populateUnitSelectors();
});

differentSystemBtn.addEventListener("click", () => {
    currentSystem = "different";
    populateUnitSelectors();
});

unitTypeSelector.addEventListener("change", () => {
    populateUnitSelectors();
});
