const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class KeyController {
  async getAllKeys(req, res) {
    try {
      const keys = await prisma.key.findMany();
      return res.status(200).json(keys);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async addKey(req, res) {
    const { key } = req.body;

    if (!key) {
      return res.status(400).send("Key is required");
    }

    const keyAlreadyExists = await prisma.key.findUnique({
      where: { key: key },
    });

    if (keyAlreadyExists) {
      return res.status(409).send("Key already exists");
    }

    await prisma.key.create({
      data: { key, status: "moderating" },
    });
    return res.status(201).send("Key added successfully");
  }

  async removeKey(req, res) {
    const { id } = req.params;

    try {
      const keyToDelete = await prisma.key.findUnique({
        where: { id: parseInt(id) },
      });

      if (!keyToDelete) {
        return res.status(404).send("Key not found");
      }

      await prisma.key.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).send("Key removed successfully");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  }

  async updateKey(req, res) {
    const { id } = req.params;
    const updatedKey = req.body;

    try {
      const keyToUpdate = await prisma.key.findUnique({
        where: { id: parseInt(id) },
      });

      if (!keyToUpdate) {
        return res.status(404).send("Key not found");
      }

      await prisma.key.update({
        where: { id: parseInt(id) },
        data: updatedKey,
      });

      return res.status(200).send("Key updated successfully");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new KeyController();
