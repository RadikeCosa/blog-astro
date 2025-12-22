---
title: "Viajero Comprador - FreeCodeCamp #134 Daily Challenge"
published: 2025-12-22T14:08:41.744Z
description: 'Resolvemos "Traveling Shopper" de FreeCodeCamp, un desafío diario que explora algoritmos de optimización y rutas eficientes para compradores que visitan múltiples tiendas.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "traveling-shopper"
---

## 🛒 Enunciado resumido

Dado un monto inicial y una lista de ítems a comprar (ambos en formato `["Cantidad", "Moneda"]`), ¿cuántos podés comprar en orden, usando la siguiente tabla de conversión?

| Moneda | Equivalente en USD |
| ------ | ------------------ |
| USD    | 1.00 USD           |
| EUR    | 1.10 USD           |
| GBP    | 1.25 USD           |
| JPY    | 0.0070 USD         |
| CAD    | 0.75 USD           |

- Si alcanza para todos, devolvé **"Buy them all!"**
- Si no, devolvé **"Buy the first x items"** (x = cantidad de ítems que podés comprar en orden).

---

## 🔎 Análisis y estrategia

El truco está en convertir todo a USD antes de comparar. Así evitamos errores y simplificamos el cálculo. El proceso es:

1. Convertir el monto inicial a USD.
2. Recorrer la lista de ítems, convirtiendo cada precio a USD.
3. Simular la compra secuencial: si alcanza, resto; si no, corto y devuelvo cuántos pude comprar.

**¿Por qué no convertir a la moneda original?** Porque todas las tasas están dadas respecto a USD, y convertir todo a una sola moneda es más directo y menos propenso a errores de redondeo.

---

## 🧪 Casos de prueba clave

- El monto alcanza para algunos, pero no todos los ítems → debe devolver la cantidad máxima posible.
- El monto alcanza justo para todos → "Buy them all!"
- Monto e ítems en monedas mezcladas → debe convertir bien.
- Monedas menos comunes (JPY, CAD) → robustez.
- El monto no alcanza ni para el primero → "Buy the first 0 items."
- Sobra dinero después de comprar todo → igual, "Buy them all!"

---

## 💡 Implementación comentada

```js
const rates = {
  USD: 1.0,
  EUR: 1.1,
  GBP: 1.25,
  JPY: 0.007,
  CAD: 0.75,
}

export default function buyItems(amount, items) {
  // Convertir monto inicial a USD
  let budget = Number.parseFloat(amount[0]) * rates[amount[1]]
  let count = 0

  for (const [price, currency] of items) {
    const priceUSD = Number.parseFloat(price) * rates[currency]
    if (budget >= priceUSD) {
      budget -= priceUSD
      count++
    }
    else {
      return `Buy the first ${count} items.`
    }
  }
  return 'Buy them all!'
}
```

---

## ⏱️ Complejidad

- **Tiempo:** $O(n)$ (recorre la lista una vez)
- **Espacio:** $O(1)$ (no usa estructuras proporcionales al input)

---

## ⚠️ Edge cases y tips

- Si no alcanza ni para el primero → "Buy the first 0 items."
- Si alcanza justo o sobra → "Buy them all!"
- Siempre convertir a USD antes de comparar.
- Usar `parseFloat` para manejar decimales y enteros.

---

## 🤔 Reflexiones y aprendizajes

- Destructuring para arrays.
- Conversión de monedas con tabla fija.
- Simulación greedy secuencial.
- Código simple, claro y óptimo para el caso.

---

## 📚 Recursos

- [Tipo de cambio - Wikipedia](https://es.wikipedia.org/wiki/Tipo_de_cambio)
- [parseFloat (MDN)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
- [Greedy Algorithms - GeeksforGeeks](https://www.geeksforgeeks.org/greedy-algorithms/)
