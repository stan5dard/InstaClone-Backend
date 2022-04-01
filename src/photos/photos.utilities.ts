export const processHashtags = (caption) => {
    //parse caption
    //get or create hashtags
    const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || []
    //없는 해시태그면 해시태그에 새로 추가하고 있는거면 이미 있는 거에 연결
    return hashtags.map(hashtag=>({where:{hashtag}, create:{hashtag}}))
}