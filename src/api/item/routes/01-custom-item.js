module.exports = {
    routes: [
      {
        "method": "GET",
        "path": "/all-items",
        "handler": "item.getAllItems",
        "config": {
          "policies": []
        }
      }
    ]
  }