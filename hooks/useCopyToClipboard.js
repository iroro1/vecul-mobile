import * as Clipboard from "expo-clipboard";
import { useState } from "react";

const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = async (e) => {
    await Clipboard.setStringAsync(e);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };
  return {
    copyHook: copyToClipboard,
    pasteHook: fetchCopiedText,
  };
};

export default useCopyToClipboard;
