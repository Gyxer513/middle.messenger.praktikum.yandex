// language=hbs
export const template = `
    <div class="avatar-container" id="avatar-container">
        <img src={{ src }} alt="Avatar" id="avatar-image" class="avatar-image">
        <div class="upload-overlay" id="upload-overlay">
            <input type="file" accept="image/*" id="upload-input" class="upload-input">
            <label for="upload-input" class="upload-label">Upload</label>
        </div>
    </div>
`;
