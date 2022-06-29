const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Dtc = require('../models/dtc-model');

//////////////////GET DTCS//////////////////
const getAllDtcs = async (req, res, next) => {
  let dtcList;

  try {
    dtcList = await Dtc.find(
      {},
      {
        __v: 0,
        date: 0,
        system: { subCode: 0, subName: 0 },
        code: { location: 0 },
      }
    ).sort({ 'code.title': 'asc' });
  } catch (error) {
    return next(new HttpError('Failed to fetch DTCs.', 500));
  }

  if (!dtcList || dtcList.length === 0) {
    return next(new HttpError('Could not find DTCs.', 404));
  }

  res.json({ dtcList: dtcList.map((dtc) => dtc.toObject({ getters: true })) });
};

//////////////////GET BY ID DTC/////////////
const getDtcById = async (req, res, next) => {
  const dtcId = req.params.id;

  let dtc;

  try {
    dtc = await Dtc.findById(dtcId, { __v: 0 });
  } catch (error) {
    return next(new HttpError('Something went wrong.', 500));
  }

  if (!dtc || dtc.length === 0) {
    return next(new HttpError('Could not find DTC.', 404));
  }

  res.json({ dtc: dtc.toObject({ getters: true }) });
};

//////////////////ADD DTC///////////////////
const addDtc = async (req, res, next) => {
  if (!req.userData.userId) {
    return next(new HttpError('You are not allowed to add DTC.', 401));
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs, check your data.', 422));
  }

  const {
    system: { title: systemTitle, subCode, subName },
    code: { title: codeTitle, description, location },
  } = req.body;

  const getDate = new Date();

  const newDtc = new Dtc({
    system: {
      title: systemTitle,
      subCode,
      subName,
    },
    code: {
      title: codeTitle,
      description,
      location,
    },
    date: {
      created: getDate,
      edited: getDate,
    },
  });

  try {
    await newDtc.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError('Adding new DTC failed, please try again.', 500));
  }

  res.status(201).json({ dtc: newDtc.toObject({ getters: true }) });
};

//////////////////EDIT DTC//////////////////
const editDtc = async (req, res, next) => {
  if (!req.userData.userId) {
    return next(new HttpError('You are not allowed to edit DTC.', 401));
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs, check your data.', 422));
  }

  const dtcId = req.params.id;
  const {
    system: { title: systemTitle, subCode, subName },
    code: { title: codeTitle, description, location },
  } = req.body;

  let dtc;

  try {
    dtc = await Dtc.findById(dtcId);
  } catch (error) {
    return next(new HttpError('Something went wrong.', 500));
  }

  dtc.system.title = systemTitle;
  dtc.system.subCode = subCode;
  dtc.system.subName = subName;
  dtc.code.title = codeTitle;
  dtc.code.description = description;
  dtc.code.location = location;
  dtc.date.edited = new Date();

  try {
    await dtc.save();
  } catch (error) {
    return next(new HttpError('Something went wrong.', 500));
  }

  res.status(200).json({ dtc: dtc.toObject({ getters: true }) });
};

//////////////////DELETE DTC////////////////
const deleteDtc = async (req, res, next) => {
  if (!req.userData.userId) {
    return next(new HttpError('You are not allowed to delete DTC.', 401));
  }

  const dtcId = req.params.id;

  let dtc;

  try {
    dtc = await Dtc.findById(dtcId);
  } catch (error) {
    return next(new HttpError('Something went wrong.', 500));
  }

  if (!dtc) {
    return next(new HttpError('Could not delete DTC.', 404));
  }

  try {
    await Dtc.deleteOne({ _id: dtcId });
  } catch (error) {
    return next(new HttpError('Something went wrong.', 500));
  }

  res.status(200).json({ message: 'Deleted DTC.' });
};

module.exports = {
  getAllDtcs,
  getDtcById,
  addDtc,
  editDtc,
  deleteDtc,
};
