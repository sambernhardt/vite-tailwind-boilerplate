import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/reserve")({
  component: RouteComponent,
});

const MIN_GUESTS = 1;
const MAX_GUESTS = 50;

type ReservationFormState = {
  date: Date | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  numberOfGuests: number;
};

function RouteComponent() {
  const [reservationFormState, setReservationFormState] =
    useState<ReservationFormState>({
      date: new Date(),
      startTime: "17:00",
      endTime: "18:00",
      numberOfGuests: 1,
    });

  return (
    <div className="w-screen h-[calc(100vh-100px)] flex items-center justify-center p-4">
      <div className="flex flex-col gap-4 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 bg-white dark:bg-neutral-900">
        <h3 className="text-2xl font-bold">Reserve David's pool</h3>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <div>
            <DayPicker
              animate
              mode="single"
              selected={reservationFormState.date}
              disabled={{ dayOfWeek: [0, 6] }}
              onSelect={(date) =>
                setReservationFormState({
                  ...reservationFormState,
                  date,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Date</label>
              <input
                type="date"
                className="border border-neutral-300 dark:border-neutral-800 rounded-md p-2"
                value={reservationFormState.date?.toISOString().split("T")[0]}
                onChange={(e) =>
                  setReservationFormState({
                    ...reservationFormState,
                    date: new Date(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Time</label>
              <div className="flex gap-2 items-center">
                <input
                  type="time"
                  className="border border-neutral-300 dark:border-neutral-800 rounded-md p-2 flex-1"
                  value={reservationFormState.startTime}
                  onChange={(e) =>
                    setReservationFormState({
                      ...reservationFormState,
                      startTime: e.target.value,
                    })
                  }
                />
                <span className="text-xs">to</span>
                <input
                  type="time"
                  className="border border-neutral-300 dark:border-neutral-800 rounded-md p-2 flex-1"
                  value={reservationFormState.endTime}
                  onChange={(e) =>
                    setReservationFormState({
                      ...reservationFormState,
                      endTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm">Number of Guests</label>
              <div className="flex gap-2 items-center w-full">
                <button
                  className="bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 rounded-md p-2 w-10"
                  onClick={() =>
                    setReservationFormState((prev) => ({
                      ...prev,
                      numberOfGuests: Math.max(
                        prev.numberOfGuests - 1,
                        MIN_GUESTS
                      ),
                    }))
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  className="border border-neutral-300 dark:border-neutral-800 rounded-md p-2 flex-1 text-center"
                  value={reservationFormState.numberOfGuests}
                  min={MIN_GUESTS}
                  max={MAX_GUESTS}
                  onChange={(e) =>
                    setReservationFormState({
                      ...reservationFormState,
                      numberOfGuests: parseInt(e.target.value),
                    })
                  }
                />
                <button
                  className="bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 rounded-md p-2 w-10"
                  onClick={() =>
                    setReservationFormState((prev) => ({
                      ...prev,
                      numberOfGuests: Math.min(
                        prev.numberOfGuests + 1,
                        MAX_GUESTS
                      ),
                    }))
                  }
                >
                  +
                </button>
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-400 text-white rounded-md p-2">
              Request
            </button>
          </div>
        </div>
        <pre>{JSON.stringify({ reservationFormState }, null, 2)}</pre>
      </div>
    </div>
  );
}
