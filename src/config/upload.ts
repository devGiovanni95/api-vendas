import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    /*Pega o nome do arquivo */
    filename(request, file, callback) {
      /*
       *Adicionando uma chave ao arquivo utilizando a criptografia/hash
       * para evitar de termos dois nomes iguais no nosso servidor
       */
      const fileHash = crypto.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
