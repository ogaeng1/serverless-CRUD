/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");
const docClient = new AWS.DynamoDB.DocumentClient();

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get("/board", async function (req, res) {
  try {
    const data = await docClient.scan({ TableName: "board-dev" }).promise();
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/board/:id", async function (req, res) {
  const params = {
    TableName: "board-dev",
    Key: {
      id: req.params.id,
    },
  };

  try {
    const data = await docClient.get(params).promise();
    const updateParams = {
      TableName: "board-dev",
      Key: {
        id: req.params.id,
      },
      UpdateExpression: "set viewCount = viewCount + :val",
      ExpressionAttributeValues: {
        ":val": 1
      },
      ReturnValues:"UPDATED_NEW"
    };

    await docClient.update(updateParams).promise();
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/board", function(req, res) {
  const params = {
    TableName: "board-dev",
    Item: {
      id: uuid(),
      user: req.body.user,
      title: req.body.title,
      content: req.body.content,
      createdAt: req.body.createdAt,
      viewCount: req.body.viewCount,
    }
  }
  docClient.put(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({ success: "게시글 등록 완료" })
  })
})

app.delete("/board/:id", async function (req, res) {
  const params = {
    TableName: "board-dev",
    Key: {
      id: req.params.id,
    },
  };

  try {
    await docClient.delete(params).promise();
    res.json({ success: "게시글 삭제 완료" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.patch("/board/:id", async function (req, res) {
  const params = {
    TableName: "board-dev",
    Key: {
      id: req.params.id,
    },
    UpdateExpression: "set title = :title, content = :content",
    ExpressionAttributeValues: {
      ":title": req.body.title,
      ":content": req.body.content
    },
    ReturnValues:"UPDATED_NEW"
  };

  try {
    await docClient.update(params).promise();
    res.json({ success: "게시글 수정 완료" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app