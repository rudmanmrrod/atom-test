import request from "supertest";
import app from "../app"
import { Status, Task } from "./model";

describe('Tasks Endpoints', () => {

  const payload = {
    title: 'test task',
    description: 'test task description',
    status: Status['PENDING'],
    email: "rudmanmrrod@gmail.com"
  }

  it('GET - all tasks', async () => {
    const res = await request(app).get("/tasks?email=rudmanmrrod@gmail.com");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET - none tasks', async () => {
    const res = await request(app).get("/tasks?email=");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it('POST - create task', async () => {
    const res = await request(app).post("/tasks").send(payload);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBeDefined();
  });

  it('PUT - update task', async () => {
    const editedDescription = "test task description update";
    const taskList = await request(app).get("/tasks?email=rudmanmrrod@gmail.com");
    const currentTask = taskList.body.filter((task: Task) => task.title == payload.title)[0];
    const newPayload = {
      ...payload,
      description: editedDescription
    }
    const res = await request(app).put("/tasks/"+currentTask.id).send(newPayload);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    const afterUpdated = await request(app).get("/tasks?email=rudmanmrrod@gmail.com");
    const traskEdited = afterUpdated.body.filter((task: Task) => task.title == payload.title)[0];
    expect(traskEdited.description).toBe(editedDescription);
  });

  it('DELETE - delete task', async () => {
    const beforeDelete = await request(app).get("/tasks?email=rudmanmrrod@gmail.com");
    const currentTask = beforeDelete.body.filter((task: Task) => task.title == payload.title)[0];
    const res = await request(app).delete("/tasks/"+currentTask.id);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    const afterDelete = await request(app).get("/tasks?email=rudmanmrrod@gmail.com");
    expect(beforeDelete.body.length).toBeGreaterThan(afterDelete.body.length);
  });

});