import News from "../models/News.js";

export const createService = (body) => News.create(body);

export const findAllService = (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countNews = () => News.countDocuments();

export const topNewsService = () =>
  News.findOne().sort({ _id: -1 }).populate("user");

export const findByIdService = (id) => News.findById(id).populate("user");

export const searchByTitleService = (title) =>
  News.find({
    title: {
      $regex: `${title || ""}`,
      $options: "i",
    },
  })
    .sort({ _id: -1 })
    .populate("user");

export const byUserService = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user");

export const updateService = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

export const deleteNewsService = (id) => News.findOneAndDelete({ _id: id });

export const likeService = (idnews, userId) =>
  News.findOneAndUpdate(
    { _id: idnews, "likes.userId":{$nin: [userId]} },
    { $push: { likes: { userId, created: new Date() } } }
  );

/*  $push = adiciona
    $pull = remove 
*/

export const dellikeService = (idnews, userId) => News.findOneAndUpdate(
  { _id: idnews },
  { $pull: { likes: { userId } } }
);