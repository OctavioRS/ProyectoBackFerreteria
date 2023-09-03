import app from '../../app.js'
import request from 'supertest';
import mongoose from 'mongoose';

const doc = {
    title: "buzo",
    description : "canguro",
    code: "55",
    price : 216,
    status : "True",
    stock : 123,
    category : "vestimenta",
    thumbnails: "www.buzo.com",
  };


describe('Tests integrales app Product', () => {
  let authToken; 

  beforeAll(async () => {

    const userCredentials = {
      email: 'd@mail.com',
      password: '123'
    };


    const userResponse = await request(app).post('/users/login').send(userCredentials);
    authToken = userResponse.header.authorization
    console.log("🚀 ~ file: app.test.js:30 ~ beforeAll ~ authToken:", authToken)
  });

  test('[POST] /products', async () => {
    const response = await request(app).post('/products').send(doc).set('Authorization', `Bearer ${authToken}`)
      
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(doc.title);
    expect(response.body.description).toBe(doc.description);
  })
})

 