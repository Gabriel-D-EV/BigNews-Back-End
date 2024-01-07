import {
  createService,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  searchByTitleService,
  byUserService,
} from "../services/news.services.js";

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({ message: " Preencha todos os campos." });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const news = await findAllService(offset, limit);
    const total = await countNews();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const prev = offset - limit < 0 ? null : offset + limit;
    const prevUrl =
      prev != null ? `${currentUrl}?limit=${limit}&offset=${prev}` : null;

    if (news.length === 0) {
      return res.status(400).send({ message: "Não há Notícias registradas!" });
    }

    res.send({
      nextUrl,
      prevUrl,
      limit,
      offset,
      total,
      results: news.map((Item) => ({
        id: Item._id,
        title: Item.title,
        text: Item.text,
        banner: Item.banner,
        likes: Item.likes,
        comments: Item.comments,
        name: Item.user.name,
        username: Item.user.username,
        userAvatar: Item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const topNews = async (req, res) => {
  try {
    const new1 = await topNewsService();
    if (!new1) {
      return res.status(400).send({ message: "Não há Notícias registradas!" });
    }

    res.send({
      news: {
        id: new1._id,
        title: new1.title,
        text: new1.text,
        banner: new1.banner,
        likes: new1.likes,
        comments: new1.comments,
        name: new1.user.name,
        username: new1.user.username,
        userAvatar: new1.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const new1 = await findByIdService(id);

    res.send({
      news: {
        id: new1._id,
        title: new1.title,
        text: new1.text,
        banner: new1.banner,
        likes: new1.likes,
        comments: new1.comments,
        name: new1.user.name,
        username: new1.user.username,
        userAvatar: new1.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const new1 = await searchByTitleService(title);
    if (new1.length === 0) {
      return res.status(400).send({ message: "Não há Notícias registradas !" });
    }

    return res.send({
      results: new1.map((Item) => ({
        id: Item._id,
        title: Item.title,
        text: Item.text,
        banner: Item.banner,
        likes: Item.likes,
        comments: Item.comments,
        name: Item.user.name,
        username: Item.user.username,
        userAvatar: Item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const new1 = await byUserService(id);
    console.log(id);

    return res.send({
      results: new1.map((Item) => ({
        id: Item._id,
        title: Item.title,
        text: Item.text,
        banner: Item.banner,
        likes: Item.likes,
        comments: Item.comments,
        name: Item.user.name,
        username: Item.user.username,
        userAvatar: Item.user.avatar
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
