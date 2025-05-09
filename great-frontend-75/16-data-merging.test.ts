import { describe, expect, test } from "vitest";

type Session = { user: number; duration: number; equipment: Array<string> };

function mergeData(sessions: Array<Session>): Array<Session> {
  const resultsMap = new Map<
    number,
    { duration: number; equipment: Set<string> }
  >();
  for (const sess of sessions) {
    const entry = resultsMap.get(sess.user);

    // user has a previous session already
    if (entry) {
      entry.duration += sess.duration;
      // if no equipment just increase duration
      if (sess.equipment.length === 0) {
        continue;
      }

      // add each equipment
      sess.equipment.forEach((eq) => {
        entry.equipment.add(eq);
      });
      // no previous session
    } else {
      const entry = {
        duration: sess.duration,
        equipment: new Set(sess.equipment),
      };
      resultsMap.set(sess.user, entry);
    }
  }

  const results: Session[] = [];
  for (const [k, v] of resultsMap) {
    results.push({
      user: k,
      duration: v.duration,
      equipment: [...v.equipment].sort(),
    });
  }

  return results;
}

function dataSmall() {
  return [
    { user: 8, duration: 50, equipment: ["bench"] },
    { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
    { user: 1, duration: 10, equipment: ["barbell"] },
    { user: 7, duration: 100, equipment: ["bike", "kettlebell"] },
    { user: 7, duration: 200, equipment: ["bike"] },
    { user: 2, duration: 200, equipment: ["treadmill"] },
    { user: 2, duration: 200, equipment: ["bike"] },
  ];
}

describe("mergeData", () => {
  test("empty data", () => {
    expect(mergeData([])).toEqual([]);
  });

  test("does not mutate data", () => {
    const clonedData = dataSmall();
    mergeData(clonedData);
    expect(clonedData).toEqual(dataSmall());
  });

  describe("one user", () => {
    test("single session", () => {
      expect(
        mergeData([{ user: 1, duration: 10, equipment: ["barbell"] }])
      ).toEqual([{ user: 1, duration: 10, equipment: ["barbell"] }]);
    });

    test("merge duration", () => {
      expect(
        mergeData([
          { user: 1, duration: 10, equipment: ["barbell"] },
          { user: 1, duration: 30, equipment: [] },
        ])
      ).toEqual([{ user: 1, duration: 40, equipment: ["barbell"] }]);
    });

    test("merge equipment", () => {
      expect(
        mergeData([
          { user: 1, duration: 10, equipment: ["bike"] },
          { user: 1, duration: 30, equipment: ["barbell"] },
        ])
      ).toEqual([{ user: 1, duration: 40, equipment: ["barbell", "bike"] }]);
    });

    test("multiple sessions", () => {
      expect(
        mergeData([
          { user: 1, duration: 10, equipment: ["bike"] },
          { user: 1, duration: 30, equipment: ["barbell"] },
        ])
      ).toEqual([{ user: 1, duration: 40, equipment: ["barbell", "bike"] }]);
    });
  });

  describe("multiple users", () => {
    test("unique users", () => {
      expect(
        mergeData([
          { user: 8, duration: 50, equipment: ["bench"] },
          { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
        ])
      ).toEqual([
        { user: 8, duration: 50, equipment: ["bench"] },
        { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
      ]);
    });

    test("merge duration", () => {
      expect(
        mergeData([
          { user: 8, duration: 50, equipment: ["bench"] },
          { user: 8, duration: 50, equipment: ["bench"] },
          { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
        ])
      ).toEqual([
        { user: 8, duration: 100, equipment: ["bench"] },
        { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
      ]);
    });

    test("merge equipment", () => {
      expect(
        mergeData([
          { user: 8, duration: 50, equipment: ["bench", "dumbbell"] },
          { user: 8, duration: 50, equipment: ["bench"] },
          { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
        ])
      ).toEqual([
        { user: 8, duration: 100, equipment: ["bench", "dumbbell"] },
        { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
      ]);
    });

    test("preserves order", () => {
      expect(
        mergeData([
          { user: 8, duration: 50, equipment: ["bench", "dumbbell"] },
          { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
          { user: 8, duration: 50, equipment: ["bench"] },
          { user: 6, duration: 50, equipment: ["kettlebell"] },
        ])
      ).toEqual([
        { user: 8, duration: 100, equipment: ["bench", "dumbbell"] },
        { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
        { user: 6, duration: 50, equipment: ["kettlebell"] },
      ]);
    });

    test("integration", () => {
      expect(mergeData(dataSmall())).toEqual([
        { user: 8, duration: 50, equipment: ["bench"] },
        {
          user: 7,
          duration: 450,
          equipment: ["bike", "dumbbell", "kettlebell"],
        },
        { user: 1, duration: 10, equipment: ["barbell"] },
        { user: 2, duration: 400, equipment: ["bike", "treadmill"] },
      ]);
    });
  });
});
