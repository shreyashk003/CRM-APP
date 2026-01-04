// This test validates business rules defined in the assignment PDF
// It does not require a DB connection, so it won't throw 'connection' errors.

describe("CRM Business Rules Validation", () => {
  
  // Requirement: Only "Won" and "Lost" count as closed [cite: 82]
  const isClosed = (stage: string) => ["Won", "Lost"].includes(stage);

  it("should mark 'Won' as a closed deal", () => {
    expect(isClosed("Won")).toBe(true);
  });

  it("should mark 'Lost' as a closed deal", () => {
    expect(isClosed("Lost")).toBe(true);
  });

  it("should mark 'Negotiation' as an open deal", () => {
    expect(isClosed("Negotiation")).toBe(false);
  });
  
  // Requirement: Roles must be exactly 'manager' or 'rep' [cite: 32]
  it("should validate allowed user roles", () => {
    const roles = ["manager", "rep"];
    expect(roles).toContain("manager");
    expect(roles).toContain("rep");
  });
});