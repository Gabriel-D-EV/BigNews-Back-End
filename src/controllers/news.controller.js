import {
  createService,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
  deleteNewsService,
  likeService,
  dellikeService,
  addCommentService,
  delCommentService
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

    res.send({
      id: req._id,
      title: title,
      text: text,
      banner: banner,
    });
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
      limit = 12;
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
      results: {
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
      data: {
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
    return res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      res.status(400).send({ message: " Preencha os campos para update." });
    }

    const new1 = await findByIdService(id);

    if (new1.user._id.toString() != req.userId.toString()) {
      return res.status(400).send({
        message: "Você não tem permissão para atualizar este Post!",
      });
    }

    await updateService(id, title, text, banner);

    return res.send({
      id: id,
      title: title,
      text: text,
      banner: banner,
      message: "Notícia atualizada com sucesso!"
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const new1 = await findByIdService(id);

    console.log(new1, id);

    if (new1.user._id.toString() != req.userId.toString()) {
      return res.status(400).send({
        message: "Você não tem permissão para apagar esta notícia!",
      });
    }

    await deleteNewsService(id);

    return res.send({ message: "Notícia apagada com sucesso!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const like = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const liked = await likeService(id, userId);

    if(!liked) {
      await dellikeService(id, userId);
      return res.status(200).send({ message: "Like removido!" });
    };


    res.send("Like");

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if(!comment) {res.status(404).send({ message: "Sem comentários" })};
    res.send({ message: "Comentário feito com sucesso!" });

    await addCommentService(id, userId, comment);


  } catch (error) { return res.status(500).send({ message: error.message });}
};

export const delComment = async (req, res) => {
  try {
    const { idnews, idComment } = req.params;
    const userId = req.userId;


    const commentDel = await delCommentService(idnews, userId, idComment);


    const commentFind = commentDel.comments.find((comment) => comment.idComment === idComment);

    if(commentFind.userId.toString() !== userId.toString()) {
      return res.status(400).send({ message: "Você não tem permissão para apagar este comentário!" });
    }

    res.send({ message: "Comentário apagado" });


  } catch (error) { return res.status(500).send({ message: error.message });}
};

