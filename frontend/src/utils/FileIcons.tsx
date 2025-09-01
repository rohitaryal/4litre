import type { JSX } from "react";
import {
    FiFile,
    FiFileText,
    FiImage,
    FiFilm,
    FiMusic,
    FiArchive,
    FiCode,
    FiBook,
    FiDatabase,
} from "react-icons/fi";

export const fileIcons: Record<string, JSX.Element> = {
    "image/png": <FiImage size="3em" />,
    "image/jpeg": <FiImage size="3em" />,
    "image/jpg": <FiImage size="3em" />,
    "image/gif": <FiImage size="3em" />,
    "image/svg+xml": <FiImage size="3em" />,
    "image/webp": <FiImage size="3em" />,

    "video/mp4": <FiFilm size="3em" />,
    "video/webm": <FiFilm size="3em" />,
    "video/ogg": <FiFilm size="3em" />,

    "audio/mpeg": <FiMusic size="3em" />,
    "audio/mp3": <FiMusic size="3em" />,
    "audio/wav": <FiMusic size="3em" />,
    "audio/ogg": <FiMusic size="3em" />,

    "application/pdf": <FiFileText size="3em" />,
    "text/plain": <FiFileText size="3em" />,
    "application/msword": <FiFileText size="3em" />,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        <FiFileText size="3em" />,
    "application/vnd.ms-excel": <FiFileText size="3em" />,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        <FiFileText size="3em" />,
    "application/vnd.ms-powerpoint": <FiFileText size="3em" />,
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        <FiFileText size="3em" />,

    "text/html": <FiCode size="3em" />,
    "text/css": <FiCode size="3em" />,
    "application/javascript": <FiCode size="3em" />,
    "application/json": <FiCode size="3em" />,
    "application/xml": <FiCode size="3em" />,
    "text/markdown": <FiBook size="3em" />,

    "application/zip": <FiArchive size="3em" />,
    "application/x-rar-compressed": <FiArchive size="3em" />,
    "application/x-7z-compressed": <FiArchive size="3em" />,
    "application/x-tar": <FiArchive size="3em" />,

    "application/sql": <FiDatabase size="3em" />,
    "application/x-sql": <FiDatabase size="3em" />,

    "default": <FiFile size="3em" />,
};