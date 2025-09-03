import { FiFile, FiX } from "react-icons/fi";
import styles from "./FileUpload.module.css";
import { useState } from "react";
import { fileIcons } from "../../utils/FileIcons";

// TODO: Fix the duplicate uploads problem

const FileUpload = function () {
    const [files, setFiles] = useState<File[]>([]);

    const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;

        const newSelectedFiles = [...e.target.files].filter((item) => files.every(file => file.name != item.name));

        setFiles([...files, ...newSelectedFiles]);
    }

    const handleRemove = function (file: File) {
        setFiles(files.filter(f => f != file));
    }

    const formatSize = function (size: number) {
        if (size < 1024) return size + " B";
        if (size < (1024 ** 2)) return (size / (1024 ** 2)).toFixed(2) + " KB";

        return (size / (1024 ** 2)).toFixed(2) + " MB";
    }

    return (
        <>
            <form
                className={styles.fileUploadForm}
                action="/upload"
                method="post"
                encType="multipart/form-data"
            >
                <label htmlFor="file">
                    <FiFile
                        size="4em"
                        className={styles.uploadIcon}
                    />

                    Upload your files here
                </label>
                <input
                    id="file"
                    type="file"
                    name="file"
                    multiple={true}
                    onChange={handleChange}
                />
            </form>
            <div className={styles.uploadedItems}>
                {
                    files.map(file => {
                        return (
                            <span
                                key={file.name}
                                className={styles.file}
                                data-name={file.name}
                            >
                                <FiX
                                    onClick={() => handleRemove(file)}
                                    className={styles.close} />
                                {
                                    fileIcons[file.type] || fileIcons["default"]
                                }
                                <span className={styles.fileName}>
                                    {file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name}
                                </span>
                                <span className={styles.fileSize}>
                                    {formatSize(file.size)}
                                </span>

                                <progress max="100" value={Math.random() * 100}></progress>
                            </span>
                        )
                    })
                }
            </div>
        </>
    )
}

export default FileUpload;