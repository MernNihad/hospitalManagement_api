const express = require("express");
const AdminMongoHelper = require("../mongo/admin");
const DepartmentMongoHelper = require("../mongo/department");
const DepartmentHeadsMongoHelper = require("../mongo/departmentHeads");
const EmployeesMongoHelper = require("../mongo/employees");
const authentication = require("../auth/verifying");
const { generateToken } = require("../auth/generateToken");
const mongodb = require("mongodb");

var adminRoute = express.Router();

adminRoute.get("/home", authentication, (req, res) => {
  res.json({ title: 'home page admin' })
});


// ----------LOGIN----------------------
adminRoute.post("/login", async (req, res, next) => {
  const { email, password } = req.body
  if (email && password) {
    // ----------------------
    try {
      let getSingleAdmin_Response = await AdminMongoHelper.getSingleAdmin({ email, password, });
      // --------------------------
      if (getSingleAdmin_Response) {
        let token = generateToken(getSingleAdmin_Response)
        res.status(200).json({ status: true, data: getSingleAdmin_Response, token, message: 'successfully account created' });
      } else {
        next("Email or Password is not match!");
      }
      // ---------------------
    } catch (error) {
      next(error.message);
    }
    // -----------------------------
  } else {
    next("Field is null");
  }
});
// -------------------------------------


// -----------UPDATE-------------------------
adminRoute.put("/update/:route/:id", authentication, async (req, res, next) => {
  const { route, id } = req.params
  if (Object.keys(req.body).length > 0) {
    const { email, password, name, founded_year, description, age, employee_number, department_name,report_to } = req.body
    // ----------------------
    try {
      let _id = new mongodb.ObjectId(id)
      let response_message
      // --------------------------
      switch (route) {
        // -----------------------------
        case 'admin':
          // ----------------------
          response_message = await AdminMongoHelper.updateSingleAdmin({ _id }, { $set: { email, password } });
          if (response_message.modifiedCount === 1) {
            res.json({ status: true, message: 'Profile has been updated' })
          } else {
            next('Profile update has failed')
          }
          break;
        // --------------------------

        // -----------------------
        case 'department':
          // --------------------------------
          response_message = await DepartmentMongoHelper.updateSingleDepartment({ _id }, { $set: { name, founded_year, description } });
          if (response_message.modifiedCount === 1) {
            res.json({ status: true, message: 'Department has been updated' })
          } else {
            next('Department update has failed')
          }
          break;
        // ------------------------------
        
        // -----------------------
        case 'departmentHeads':
          // --------------------------------
          response_message = await DepartmentHeadsMongoHelper.updateSingleDepartmentHeads({ _id }, { $set: { name, employee_number, age, department_name, description } });
          if (response_message.modifiedCount === 1) {
            res.json({ status: true, message: 'Department head has been updated' })
          } else {
            next('Department head update has failed')
          }
          break;
        // ------------------------------

          // -----------------------
        case 'employees':
          // --------------------------------
          response_message = await EmployeesMongoHelper.updateSingleEmployees({ _id }, { $set: { name, employee_number, age, department_name, report_to } });
          if (response_message.modifiedCount === 1) {
            res.json({ status: true, message: 'Employee has been updated' })
          } else {
            next('Employee update has failed')
          }
          break;
        // ------------------------------

        default:
          next(new Error('error'));
        // -----------------------
      }
      // ---------------------
    } catch (error) {
      next(error.message);
    }
    // -----------------------------
  } else {
    next("Field is null");
  }
});
// ------------------------------------------

// -----------CREATE-------------------------
adminRoute.post("/create/:route", authentication, async (req, res, next) => {
  const { route } = req.params
  if (Object.keys(req.body).length > 0) {
    const { name, founded_year, description, employee_number, age, department_name, report_to, image_path } = req.body
    // ----------------------
    try {
      let response_message
      // --------------------------
      switch (route) {
        case 'department':
          response_message = await DepartmentMongoHelper.createSingleDepartment({ name, founded_year, description, image_path }, { name });
          if (response_message.acknowledged === true && response_message.insertedId) {
            res.json({ status: true, message: 'Department successfully created' })
          } else if (response_message.name_available) {
            next(response_message.message)
          } else {
            next('Department creation failed')
          }
          break;
        
        case 'departmentHeads':
          response_message = await DepartmentHeadsMongoHelper.createSingleDepartmentHeads({ name, employee_number, age, department_name, description, image_path }, { name });
          if (response_message.acknowledged === true && response_message.insertedId) {
            res.json({ status: true, message: 'Department head successfully created' })
          } else if (response_message.name_available) {
            next(response_message.message)
          } else {
            next('Department head creation failed')
          }
          break;

          case 'employees':
          response_message = await EmployeesMongoHelper.createSingleEmployees({ name, employee_number, age, department_name, report_to, image_path }, { name });
          if (response_message.acknowledged === true && response_message.insertedId) {
            res.json({ status: true, message: 'Employee successfully created' })
          } else if (response_message.name_available) {
            next(response_message.message)
          } else {
            next('Employee creation failed')
          }
          break;

        default:
          next(new Error('error'));
      }
      // ---------------------
    } catch (error) {
      next(error.message);
    }
    // -----------------------------
  } else {
    next("Field is null");
  }
});
// ------------------------------------------

// -----------GET-------------------------
adminRoute.get("/get/:route", authentication, async (req, res, next) => {
  const { route } = req.params
  // ----------------------
  try {
    let response_message
    // --------------------------
    switch (route) {
      case 'department':
        response_message = await DepartmentMongoHelper.getAllDepartments({});
        if (response_message.length > 0) {
          res.json({ status: true, data: response_message })
        } else {
          next('Data not found')
        }
        break;
        case 'departmentHeads':
        response_message = await DepartmentHeadsMongoHelper.getAllDepartmentHeads({});
          if (response_message.length > 0) {
            res.json({ status: true, data: response_message })
          } else {
            next('Data not found')
          }
          break;

          case 'employees':
        response_message = await EmployeesMongoHelper.getAllEmployees();
          if (response_message.length > 0) {
            res.json({ status: true, data: response_message })
          } else {
            next('Data not found')
          }
          break;
      default:
        next(new Error('error'));
    }
    // ---------------------
  } catch (error) {
    next(error.message);
  }
  // -----------------------------
});
// ----------------------------------------


// -----------DELETE-------------------------
adminRoute.delete("/delete/:route/:id", authentication, async (req, res, next) => {
  const { route, id } = req.params
  if (route && id ) {
    // ----------------------
    try {
      let _id = new mongodb.ObjectId(id)
      let response_message
      // --------------------------
      switch (route) {
        // ------------------------------
        case 'department':
          // --------------------------------
          response_message = await DepartmentMongoHelper.deleteSingleDepartment({ _id });
          if (response_message.deletedCount === 1) {
            res.json({ status: true, message: 'Successfully deleted ' })
          } else {
            next('Failed')
          }
          break;
        // ------------------------------


        // ------------------------------
        case 'departmentHeads':
          // --------------------------------
          response_message = await DepartmentHeadsMongoHelper.deleteSingleDepartmentHeads({ _id });
          if (response_message.deletedCount === 1) {
            res.json({ status: true, message: 'Successfully deleted ' })
          } else {
            next('Failed')
          }
          break;
        // ------------------------------

        // ------------------------------
        case 'employees':
          // --------------------------------
          response_message = await EmployeesMongoHelper.deleteSingleEmployees({ _id });
          if (response_message.deletedCount === 1) {
            res.json({ status: true, message: 'Successfully deleted ' })
          } else {
            next('Failed')
          }
          break;
        // ------------------------------

        default:
          next(new Error('error'));
      }
      // ---------------------
    } catch (error) {
      next(error.message);
    }
    // -----------------------------
  } else {
    next("Field is null");
  }
});
// ------------------------------------------


// -----------GET-NAMES-------------------------
adminRoute.get("/get/names/:route", authentication, async (req, res, next) => {
  const { route } = req.params
  // ----------------------
  try {
    let response_message
    // --------------------------
    switch (route) {
      case 'department':
        response_message = await DepartmentMongoHelper.getAllDepartments({}, { projection: { _id: 0, name: 1 } });
        if (response_message.length > 0) {
          res.json({ status: true, data: response_message })
        } else {
          next('Data not found')
        }
        break;
        case 'departmentHeads':
        response_message = await DepartmentHeadsMongoHelper.getAllDepartmentHeads({}, { projection: { _id: 0, name: 1 } });
          if (response_message.length > 0) {
            res.json({ status: true, data: response_message })
          } else {
            next('Data not found')
          }
          break;
      default:
        next(new Error('error'));
    }
    // ---------------------
  } catch (error) {
    next(error.message);
  }
  // -----------------------------
});
// ---------------------------------------------

module.exports = adminRoute;
