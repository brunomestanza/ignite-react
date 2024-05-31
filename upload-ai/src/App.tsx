import { GithubLogo, MagicWand } from "@phosphor-icons/react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Desenvolvido com 💜 no NLW da Rocketseat</span>
          <Separator orientation="vertical" className="h-6" />
          <Button variant='outline'>Github <GithubLogo className="h-4 w-4 ml-2" /></Button>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea placeholder="Inclua o prompt para a IA..." className="resize-none p-5 leading-relaxed" />
            <Textarea placeholder="Resultado gerado pela IA..." className="resize-none p-5 leading-relaxed" readOnly />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>
        </div>
        <aside className="w-80 space-y-6">
          <VideoInputForm />

          <form className="space-y-6">
          <div className="space-y-2">
            <Label>Prompt</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um prompt" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Título do YouTube</SelectItem>
                <SelectItem value="description">Descrição do Youtube</SelectItem>
              </SelectContent>
            </Select>
            <span className="block text-sm text-muted-foreground italic">Você poderá customizar essa opção em breve</span>
          </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select disabled defaultValue="gpt-3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-sm text-muted-foreground italic">Você poderá customizar essa opção em breve</span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperatura</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
              />
              <span
                className="block text-sm text-muted-foreground italic leading-relaxed"
              >
                Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button className="w-full" type="submit">Executar <MagicWand className="w-4 h-4 ml-2" /></Button>
          </form>
        </aside>
      </main>
    </div>
  )
}