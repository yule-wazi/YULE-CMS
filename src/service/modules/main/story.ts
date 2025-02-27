import hyRequest from "@/service";

export function postStory(data: any) {
  return hyRequest.post({
    url: '/story',
    data: {
      title: data.title,
      content: data.content
    }
  })
}