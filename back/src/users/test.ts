import request from "supertest";
import app from "../app"

describe('User Endpoints', () => {

  it('GET - Check user', async () => {
    const res = await request(app).get("/users/rudmanmrrod@gmail.com");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

});