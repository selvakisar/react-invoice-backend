import express from 'express';
import {createProfile, deleteProfile, getProfile, getProfileByUser, updateProfile} from '../controllers/profile.js';




const router =express.Router();

router.get('/:id',getProfile);
router.get('/',getProfileByUser)
router.post('/',createProfile)
router.put('/:id',updateProfile)
router.delete('/:id',deleteProfile)


const profileRouter=router
export {profileRouter}