"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

type ZakatEntry = {
  type: "savings" | "donations";
  title: string;
  description: string;
  amount: number;
  currency: string;
};

const testZakatEntries: ZakatEntry[] = [
  {
    type: "savings",
    title: "Bank savings",
    description: "All my saving",
    amount: 2000,
    currency: "EUR",
  },
  {
    type: "donations",
    title: "Donations to Palestine",
    description: "Donations to charity",
    amount: 200,
    currency: "EUR",
  },
];

const minimumForZakatInEUR = 1500;

const shouldPayZakat = (zakatEntries: ZakatEntry[]) => {
  const totalSavings = zakatEntries
    .filter((entry) => entry.type === "savings")
    .reduce((acc, entry) => acc + entry.amount, 0);
  const totalDonations = zakatEntries
    .filter((entry) => entry.type === "donations")
    .reduce((acc, entry) => acc + entry.amount, 0);
  return totalSavings - totalDonations > minimumForZakatInEUR;
};

const calculateZakatAmount = (zakatEntries: ZakatEntry[]) => {
  const totalSavings = zakatEntries
    .filter((entry) => entry.type === "savings")
    .reduce((acc, entry) => acc + entry.amount, 0);

  return totalSavings * 0.025;
};

const calculateRemainingZakat = (
  totalZakat: number,
  zakatEntries: ZakatEntry[]
) => {
  calculateZakatAmount(zakatEntries);
  const totalDonations = zakatEntries
    .filter((entry) => entry.type === "donations")
    .reduce((acc, entry) => acc + entry.amount, 0);

  return totalZakat - totalDonations;
};

export default function Zakat() {
  const [zakatEntries, setZakatEntries] =
    useState<ZakatEntry[]>(testZakatEntries);
  const [shouldPay, setShouldPay] = useState<boolean>(
    shouldPayZakat(zakatEntries)
  );
  const [zakatAmount, setZakatAmount] = useState(
    calculateZakatAmount(zakatEntries)
  );
  const [remainingZakat, setRemainingZakat] = useState<number>(
    calculateRemainingZakat(zakatAmount, zakatEntries)
  );

  return (
    <div className="container">
      <section className="mb-10">
        {shouldPay ? (
          <>
            <h2 className="font-bold">
              Given the amount in your savings, you should pay zakat:{" "}
              {zakatAmount} EUR
            </h2>
            {remainingZakat < 0 && (
              <p>
                Wow, you've already donated your Zakat, you even donated{" "}
                {remainingZakat * -1} EUR Sadaka. May Allah accept your
                donations.
              </p>
            )}
            {remainingZakat > 0 && (
              <p>
                You still have already {remainingZakat} EUR to donate for Zakat
              </p>
            )}
            {remainingZakat === 0 && (
              <p>
                You have already paid your Zakat, may Allah accept your
                donations.
              </p>
            )}
          </>
        ) : (
          <h2 className="font-bold">
            You do not have to pay zakat, your savings are less than the minimum
            required {minimumForZakatInEUR} EUR
          </h2>
        )}
      </section>
      <section className="flex flex-col justify-around md:flex-row gap-6">
        <div id="savings" className="basis-1/3">
          <h2 className="font-bold text-center text-2xl mb-2">Savings</h2>
          {zakatEntries
            .filter((entry) => entry.type === "savings")
            .map((entry) => (
              <Paper elevation={1} className="p-3">
                <h3 className="font-bold">{entry.title}</h3>
                <p className="italic">{entry.description}</p>
                <p>
                  {entry.amount}
                  {entry.currency}
                </p>
              </Paper>
            ))}
          <IconButton className="mx-auto" aria-label="delete">
            <AddIcon />
          </IconButton>
        </div>
        <div id="donations" className="basis-1/3">
          <h2 className="font-bold text-center text-2xl mb-2">Donations</h2>
          {zakatEntries
            .filter((entry) => entry.type === "donations")
            .map((entry) => (
              <Paper elevation={1} className="p-3">
                <h3 className="font-bold">{entry.title}</h3>
                <p className="italic">{entry.description}</p>
                <p>
                  {entry.amount}
                  {entry.currency}
                </p>
              </Paper>
            ))}
          <IconButton aria-label="delete">
            <AddIcon />
          </IconButton>
        </div>
      </section>
      <section className="mt-6">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Zakat explanation
          </AccordionSummary>
          <AccordionDetails>
            Zakat is a charity God obligates Muslims to pay yearly on their
            money and property. Its payment is made to the poor, vulnerable, and
            deserving as their divinely established right. The Prophet Muhammad,
            on him be peace, established Zakat as the third of the five pillars
            that Islam is built on.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Who to donate to?
          </AccordionSummary>
          <AccordionDetails>
            Muslims pay Zakat to eight categories of eligible people set by God
            in the Quran (Surat Al-Tawbah, 9:60):
            <ul>
              <li>The Poor (in dire need prevented from asking)</li>
              <li>The Indigent (whose destitution drives them to ask)</li>
              <li>Those Administering Zakat’s collection and distribution</li>
              <li>Those whose hearts are to be reconciled</li>
              <li>Those in bondage (slaves to be freed and captives)</li>
              <li>The Debt-Ridden</li>
              <li>In the Cause of God</li>
              <li>
                The Wayfarer (stranded, displaced, or cut off from resources
                while traveling)
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </section>
    </div>
  );
}
