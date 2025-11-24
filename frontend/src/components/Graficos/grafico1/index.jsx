"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";


const data = [
    { dia: "Seg", valor: 30 },
    { dia: "Ter", valor: 45 },
    { dia: "Qua", valor: 20 },
    { dia: "Qui", valor: 60 },
    { dia: "Sex", valor: 50 },
];

export default function Grafico1() {
    return (

        // Recharts
        <div style={{ width: 400 }}>
            <LineChart width={400} height={250} data={data}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}