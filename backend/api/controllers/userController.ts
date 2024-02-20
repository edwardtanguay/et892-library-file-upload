/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleError } from "../../tools";
import { User } from "../schemas/userSchema";
import express from "express";
import jwt from "jsonwebtoken";
import * as config from "../../config";
import * as jwttools from "../../jwttools";
import * as tools from '../../tools';

interface CustomRequest extends Request {
	token: string;
}

export const addSingleUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json(user);
	} catch (e) {
		handleError(res, e);
	}
};

export const getSingleUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const user = await User.findById(req.params.id);
		user
			? res.status(200).json(user)
			: res.status(404).json({ msg: `user ${req.params.id} not found` });
	} catch (e) {
		handleError(res, e);
	}
};

export const getAllUsers = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (e) {
		handleError(res, e);
	}
};

export const updateSingleUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		user
			? res.status(200).json(user)
			: res.status(404).json({ msg: `user ${req.params.id} not found` });
	} catch (e) {
		handleError(res, e);
	}
};

export const deleteSingleUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		res.status(200).json(user);
	} catch (e) {
		handleError(res, e);
	}
};

export const deleteAllUsers = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const users = await User.deleteMany();
		res.status(200).json(users);
	} catch (e) {
		handleError(res, e);
	}
};

export const loginUser = async (req: any, res: express.Response) => {
	try {
		const { login } = req.body;
		const user = await User.findOne({ login });
		if (user !== null) {
			const seconds = 10;
			jwt.sign(
				{ user },
				config.sessionSecret(),
				{ expiresIn: seconds + "s" },
				(err: any, token: any) => {
					res.json({
						currentUser: tools.getCurrentUserFromUser(user), 
						token,
					});
				}
			);
		} else {
			res.status(401).json("bad login");
		}
	} catch (e) {
		handleError(res, e);
	}
};

export const getCurrentUser = async (req: any, res: express.Response) => {
	try {
		const _anonymousUser = await User.findOne({ login: 'anonymousUser' });
		const anonymousUser = tools.getCurrentUserFromUser(_anonymousUser);
		jwt.verify(
			(req as unknown as CustomRequest).token,
			config.sessionSecret(),
			(err: any) => {
				if (err) {
					res.json({
						currentUser: anonymousUser
					})
				} else {
					const data = jwttools.decodeJwt(
						(req as unknown as CustomRequest).token
					);
					const currentUser = tools.getCurrentUserFromUser(data.user);
					res.json({
						currentUser 
					});
				}
			}
		);
	} catch (e) {
		handleError(res, e);
	}
};
