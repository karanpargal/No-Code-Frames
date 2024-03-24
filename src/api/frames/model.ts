export interface FrameData {
  imageUrl: string;
  videoUrl: string;
  buttons: Button[];
  inputText: string;
  postUrl: string;
  walletAddress: string;
}

interface Button {
  action?: string;
  target?: string;
  label: string;
}

export interface RenderFrame {
  frameId: string;
}
